#!/usr/bin/env sh
set -eu

IMAGE="${1:-}"

if [ -z "$IMAGE" ]; then
  echo "Usage: scripts/deploy.sh REGISTRY/fastmenu:TAG" >&2
  exit 1
fi

kubectl kustomize k8s \
  | kubectl set image -f - fastmenu="$IMAGE" --local -o yaml \
  | kubectl apply -f -

kubectl rollout status deployment/fastmenu -n fastmenu
