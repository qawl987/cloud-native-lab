NAMESPACE=""
uninstall:
	-kubectl delete all --all --namespace=$(NAMESPACE)

all:
	-kubectl apply -f persistent-vol-for-mongodb.yaml
	-kubectl apply -f persistent-vol-for-cert.yaml
	-helm -n $(NAMESPACE) install free5gc-v1 ./free5gc/
	-helm -n $(NAMESPACE) install ueransim-v1 ./ueransim/
core:
	-kubectl apply -f persistent-vol-for-mongodb.yaml
	-kubectl apply -f persistent-vol-for-cert.yaml
	-helm -n $(NAMESPACE) install free5gc-v1 ./free5gc/
ue:
	-helm -n $(NAMESPACE) install ueransim-v1 ./ueransim/

get-all:
	kubectl get pods
service-all:
	kubectl get svc -n $(NAMESPACE)

get:
	@if [ -z "$(word 2, $(MAKECMDGOALS))" ]; then \
		echo "Usage: make get <nf-name> (e.g., make get amf)"; \
		exit 1; \
	fi
	@$(eval POD_NAME := $(shell kubectl get pods -n $(NAMESPACE) | grep "$(word 2, $(MAKECMDGOALS))" | awk '{print $$1}'))
	@if [ -z "$(POD_NAME)" ]; then \
		echo "No pod found for NF '$(word 2, $(MAKECMDGOALS))'"; \
		exit 1; \
	else \
		echo "$(POD_NAME)"; \
	fi

service:
	@if [ -z "$(word 2, $(MAKECMDGOALS))" ]; then \
		echo "Usage: make get <nf-name> (e.g., make get amf)"; \
		exit 1; \
	fi
	@$(eval SERVICE_NAME := $(shell kubectl get svc -n $(NAMESPACE) | grep "$(word 2, $(MAKECMDGOALS))" | awk '{print $$1}'))
	@if [ -z "$(SERVICE_NAME)" ]; then \
		echo "No pod found for NF '$(word 2, $(MAKECMDGOALS))'"; \
		exit 1; \
	else \
		echo "$(SERVICE_NAME)"; \
	fi

# describe directly uses $(POD_NAME)
describe: get
	@if [ -z "$(POD_NAME)" ]; then \
		echo "Error: POD_NAME is not set"; \
		exit 1; \
	else \
		kubectl describe pod "$(POD_NAME)" -n $(NAMESPACE); \
	fi

# logs directly uses $(POD_NAME)
logs: get
	@if [ -z "$(POD_NAME)" ]; then \
		echo "Error: POD_NAME is not set"; \
		exit 1; \
	else \
		kubectl logs "$(POD_NAME)" -n $(NAMESPACE); \
	fi

# exec directly uses $(POD_NAME)
exec: get
	@if [ -z "$(POD_NAME)" ]; then \
		echo "Error: POD_NAME is not set"; \
		exit 1; \
	else \
		kubectl exec -it "$(POD_NAME)" -n $(NAMESPACE) -- /bin/sh; \
	fi

edit-service: service
	@if [ -z "$(SERVICE_NAME)" ]; then \
		echo "Error: POD_NAME is not set"; \
		exit 1; \
	else \
		kubectl edit svc "$(SERVICE_NAME)" -n $(NAMESPACE); \
	fi

# Ignore extra arguments (prevent make from reporting an error)
%:
	@: