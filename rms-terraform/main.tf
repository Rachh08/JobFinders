terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
    }
  }
}
provider "azurerm" {
  features {}
}
resource "azurerm_resource_group" "jobfindersResourceGroup" {
  name = "jobfindersResourceGroup"
  location = "East US"
}
resource "azurerm_kubernetes_cluster" "jobfindersAKSCluster" {
  name = "jobfindersAKSClusters"
  location = azurerm_resource_group.jobfindersResourceGroup.location
  resource_group_name = azurerm_resource_group.jobfindersResourceGroup.name
  dns_prefix = "rms-aks"

  default_node_pool {
    name = "default"
    node_count = 1
    vm_size = "Standard_DS2_v2"
  }

  service_principal {
    client_id = "87f4e82e-81d3-45ad-8098-6e5fb0d7e5d7"
    client_secret = "JAR8Q~f01XcRVMvsXqNAixFvv2qVKGY1S9uBkbuz"
  }  
}