#!/bin/bash
# 通过 HTTP CONNECT 代理连接 SSH 隧道服务
exec nc -X connect -x 127.0.0.1:18080 "$@"
