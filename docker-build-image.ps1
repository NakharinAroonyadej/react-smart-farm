minikube docker-env
minikube -p minikube docker-env --shell powershell | Invoke-Expression
Write-Output "==============================================="
docker build -t react-smart-farm-frontend:v1 ./frontend/
docker build -t react-smart-farm-backend:v1 ./backend/
Write-Output "==============================================="
./kubectl-apply-script.ps1