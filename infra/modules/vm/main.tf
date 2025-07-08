# Virtual Machine Module - Main Configuration

# Create virtual machine
resource "azurerm_linux_virtual_machine" "vm" {
  name                = var.vm_name
  location            = var.location
  resource_group_name = var.resource_group_name
  size                = var.vm_size
  admin_username      = var.admin_username

  disable_password_authentication = true

admin_ssh_key {
  username   = var.admin_username
  public_key = file(var.ssh_public_key_path)
}

  network_interface_ids = [
    var.network_interface_id,
  ]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts-gen2"
    version   = "latest"
  }

  tags = {
    CreatedBy = "Terraform"
    Module    = "virtual-machine"
  }

  custom_data = filebase64("${path.module}/cloud-init-docker.sh")
}