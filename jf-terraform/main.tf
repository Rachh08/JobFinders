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

resource "azurerm_resource_group" "jobFindersGroup" {
  name     = "jobFindersGroup"
  location = "East US"
}

resource "azurerm_kubernetes_cluster" "jobFindersAKSCluster" {
  name                = "jobFindersAKSCluster"
  location            = azurerm_resource_group.jobFindersGroup.location
  resource_group_name = azurerm_resource_group.jobFindersGroup.name
  dns_prefix          = "jf-aks"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_DS2_v2"
  }

  service_principal {
    client_id     = "59bedfa7-dfec-46b0-b127-915a0bf48030"
    client_secret = "msI8Q~EQ9.o7PmkUyZ~wSHt4XtZhEpbSbiT5gdfa"
  }
}