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
    name = "jobfindersAKSCluster"
    location = azurerm_resource_group.jobfindersResourceGroup.location
    resource_group_name = azurerm_resource_group.jobfindersResourceGroup.name
    dns_prefix = "jobfinders-aks"

    default_node_pool {
        name = "default"
        node_count = 1
        vm_size = "Standard_DS2_v2"
    }

    service_principal {
        client_id = "eea1c124-264f-48e2-ac47-2e9f90db20fa"
        client_secret = "Nh08Q~xRR3XuZDVNIl~w.LWll1Gr4d8S1Iiy5bEK"
    }
}