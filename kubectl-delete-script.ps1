# kubectl delete secret/mongodb-secret 
# kubectl delete persistentvolumeclaim/pvc-iot 
# kubectl delete persistentvolume/pv-iot 
kubectl delete deployment.apps/mongodb-deployment 
kubectl delete service/mongodb-service 
kubectl delete deployment.apps/frontend-deployment 
kubectl delete service/frontend-service 
kubectl delete deployment.apps/backend-deployment 
kubectl delete service/backend-service 
# kubectl delete ingress.networking.k8s.io/frontend-ingress 
# kubectl delete ingress.networking.k8s.io/backend-ingress 