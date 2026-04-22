# FastMenu

FastMenu is a single-page Next.js demo for showing a real-time restaurant workflow running on Kubernetes.

The app is designed for this flow:

1. Develop locally.
2. Demo locally on a Kubernetes cluster.
3. Push the project to `https://github.com/pinoluen-netizen/fastmenu.git`.
4. Build and publish the container image with GitHub Actions to GHCR.
5. Deploy to any Kubernetes cluster with `kubectl`.

The Kubernetes manifests intentionally use only standard resources and `kubectl port-forward` for access. This keeps the demo independent from cluster-specific ingress, gateway, load balancer, or node port configuration.

## Local App Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Local Kubernetes Demo

The local Kubernetes cluster must be able to pull the configured image. The default image is:

```text
ghcr.io/pinoluen-netizen/fastmenu:latest
```

After the image exists in GHCR, deploy the portable base manifests:

```bash
kubectl apply -k k8s
kubectl rollout status deployment/fastmenu -n fastmenu
```

Access it with port-forward:

```bash
kubectl port-forward svc/fastmenu 8080:80 -n fastmenu
```

Open:

```text
http://localhost:8080
```

## Publish The Repository

```bash
git init
git branch -M main
git add .
git commit -m "Initial FastMenu Kubernetes demo"
git remote add origin https://github.com/pinoluen-netizen/fastmenu.git
git push -u origin main
```

## Container Image

The GitHub Actions workflow at `.github/workflows/container.yml` builds and publishes:

```text
ghcr.io/pinoluen-netizen/fastmenu:latest
ghcr.io/pinoluen-netizen/fastmenu:<commit-sha>
```

The default Kubernetes manifests use:

```text
ghcr.io/pinoluen-netizen/fastmenu:latest
```

For public clusters to pull the image without credentials, make the GHCR package public in GitHub after the first workflow run.

## Deploy To Any Kubernetes Cluster

After the image is published, deploy directly from GitHub:

```bash
kubectl apply -k https://github.com/pinoluen-netizen/fastmenu//k8s?ref=main
kubectl rollout status deployment/fastmenu -n fastmenu
```

The base service is `ClusterIP`, which is portable across clusters.

Access it on any cluster with `kubectl port-forward`, which does not require Ingress, LoadBalancer, NodePort, or cluster-specific add-ons:

```bash
kubectl port-forward svc/fastmenu 8080:80 -n fastmenu
```

Open:

```text
http://localhost:8080
```

For production-like access later, expose the `fastmenu` service with the cluster's preferred ingress or gateway layer.

## Deploy With A Specific Image

Use this when you want to deploy a commit-specific tag or another registry:

```bash
./scripts/deploy.sh ghcr.io/pinoluen-netizen/fastmenu:<commit-sha>
```

## Cleanup

```bash
kubectl delete namespace fastmenu
```
