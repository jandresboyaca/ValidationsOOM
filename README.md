# KEDA
kubectl apply --server-side -f https://github.com/kedacore/keda/releases/download/v2.17.0/keda-2.17.0.yaml


#  Apply custom keda
kubectl apply -f scaledobject.yaml

#  Check KEDA STATUS
kubectl get ns | grep keda
kubectl get pods -n keda
kubectl get crds | grep keda

# KEDA Logs
kubectl logs deployment/keda-operator -n keda
# Check metric
kubectl get hpa -n heap-test -w
## Port forward app
kubectl port-forward svc/demo-app -n heap-test 8080:8080
