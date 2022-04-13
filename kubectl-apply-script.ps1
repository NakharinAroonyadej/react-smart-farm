kubectl apply -f .\mongo\mongodb.yaml
kubectl apply -f .\frontend\frontend-deployment.yaml
kubectl apply -f .\backend\backend-deployment.yaml
kubectl apply -f .\ingress\ingress.yaml
minikube tunnel