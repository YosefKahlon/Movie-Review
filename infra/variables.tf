variable "resource_group_name" {
    description = "Name of the resource group"
    type        = string
}

variable "location" {
    description = "Azure region for the resources"
    type        = string
    default     = "West Europe"
}

variable "vm_name" {
    description = "Name of the virtual machine"
    type        = string  
}

variable "admin_username" {
    description = "Admin username for the VM"
    type        = string
}

variable "admin_password" {
    description = "Admin password for the VM"
    type        = string
    sensitive   = true
}


variable "vm_size" {
  description = "The size of the VM"
  type        = string
  default     = "Standard_B1s"
}