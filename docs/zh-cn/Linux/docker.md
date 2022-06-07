## docker安装
[docker安装](https://www.runoob.com/docker/ubuntu-docker-install.html)
```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

[docker-compose安装](https://www.runoob.com/docker/docker-compose.html)
```bash
 curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
 chmod +x /usr/local/bin/docker-compose
 ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
 docker-compose --version
```
## docker-compose启动镜像
编写Dockerfile

DockerFile
```bash
FROM java:8
EXPOSE 8080
VOLUME /tmp
ADD ./app.jar  /app.jar
RUN bash -c 'touch /app.jar'
ENTRYPOINT ["java","-jar","-Duser.timezone=GMT+8","/app.jar"]
```


docker-compose.yml
```yml
version: '3'

# 关于网络,如果用到mysql或者redis，并且希望在同一个网络，那么就可以直接使用同一个网络名
# docker network create project-demo_bridge
networks:
  app_bridge:
    driver: bridge

services:
  project-demo:
    container_name: app
    image: app:1.0
    restart: always
    environment:    #设置东八时区上海时间
      - SET_CONTAINER_TIMEZONE=true
      - CONTAINER_TIMEZONE=Asia/Shanghai
    volumes:
      # 同步时间
      - /etc/localtime:/etc/localtime:ro
      # 如果项目有些日志或者写文件，需要同步到宿主机器，也需要定义相应的卷
      #- ./data:/etc/app/data
      - ./log:/log
    ports:
      - 8080:8080
    networks:
      - app_bridge
```

启动脚本
```bash
#! /usr/bin/bash
PROJECT_NAME=app
containerName=$PROJECT_NAME:1.0
imagesName=$PROJECT_NAME:1.0

# 定义一个名称变量
network_name="${PROJECT_NAME}_bridge"

filterName=`docker network ls | grep $network_name | awk '{ print $2 }'`

if [ "$filterName" == "" ]; then
    # 不存在就创建
    docker network create $network_name
    echo "Created network $network_name success!!"
fi

existContainer=`docker inspect --format '{{.State.Running}}' ${containerName}`

function delExistImagesAndContainer() {
    if [ "${existContainer}" == "true" ]; then
        docker stop ${containerName}
        echo "容器：${containerName}已停止"
        docker rm ${containerName}
        echo "容器：${containerName}已删除"

        docker rmi ${imagesName}
        echo "镜像：${containerName}已删除"
    fi
}

function buildJar(){
    echo "正在构建jar镜像"
    # 其实这个构建指令是可以直接写到compose的那个启动文件中的
    docker build -f Dockerfile -t $PROJECT_NAME:1.0 .
    echo "镜像构建完成"
    echo "正在创建并启动容器"
    docker-compose -f ./docker-compose.yml up -d
}

delExistImagesAndContainer

buildJar
```

## docker启动镜像
编写Dockerfile

DockerFile
```bash
FROM java:8
EXPOSE 8080
VOLUME /tmp
ADD ./app.jar  /app.jar
RUN bash -c 'touch /app.jar'
ENTRYPOINT ["java","-jar","-Duser.timezone=GMT+8","/app.jar"]
```

安装pip
[建议使用此方式安装](https://www.runoob.com/w3cnote/python-pip-install-usage.html)
```bash
yum install -y python-pip
pip install runlike
#python -m pip uninstall pip
```
查看容器参数
```bash
runlike -p <容器名>|<容器ID>
```
runlike打印参数
```bash
docker run \
        --name=app \
        --hostname=bee90847ad27 \
        --env=SET_CONTAINER_TIMEZONE=true \
        --env=CONTAINER_TIMEZONE=Asia/Shanghai \
        --env=spring.profiles.active=dev \
        --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
        --env=LANG=C.UTF-8 \
        --env=JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 \
        --env=JAVA_VERSION=8u111 \
        --env='JAVA_DEBIAN_VERSION=8u111-b14-2~bpo8+1' \
        --env=CA_CERTIFICATES_JAVA_VERSION=20140324 \
        --volume=/etc/localtime:/etc/localtime:ro \
        --volume=/home/log:/log:rw \
        --volume=/etc/localtime \
        --volume=/tmp \
        --volume=/log \
        --network=home_app_bridge \
        -p 8080:8080 \
        --restart=always \
        --label='com.docker.compose.project=home' \
        --label='com.docker.compose.version=2.2.2' \
        --label='com.docker.compose.project.config_files=/home/docker-compose.yml' \
        --label='com.docker.compose.oneoff=False' \
        --label='com.docker.compose.image=sha256:d5540a48297e6a0fa0d941e728bc9f2911989193f2326bb7df5167b8592a63bc' \
        --label='com.docker.compose.service=project-demo' \
        --label='com.docker.compose.depends_on=' \
        --label='com.docker.compose.config-hash=9b0e44c5cd9562c4417d73806e6ed75606d1df20ac2001acbb4088ba21827d60' \
        --label='com.docker.compose.container-number=1' \
        --label='com.docker.compose.project.working_dir=/home' \
        app:1.0

```
简化配置
```bash
docker run \
        --name=app \
        --hostname=bee90847ad27 \
        --env=SET_CONTAINER_TIMEZONE=true \
        --env=CONTAINER_TIMEZONE=Asia/Shanghai \
        --env=spring.profiles.active=dev \
        --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
        --env=LANG=C.UTF-8 \
        --env=JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64 \
        --env=JAVA_VERSION=8u111 \
        --env='JAVA_DEBIAN_VERSION=8u111-b14-2~bpo8+1' \
        --env=CA_CERTIFICATES_JAVA_VERSION=20140324 \
        --volume=/etc/localtime:/etc/localtime:ro \
        --volume=/home/log:/log:rw \
        --volume=/etc/localtime \
        --volume=/tmp \
        --volume=/log \
        --network=home_app_bridge \
        -p 8080:8080 \
        --restart=always \
        app:1.0

```


清理配置,创建镜像和网络
```bash
docker stop app
docker rm app
docker image ls
docker rm app:1.0
docker build -f Dockerfile -t app:1.0 .
docker network ls
docker network rm NETWORK_ID
docker network create app_bridge
```
启动容器
```bash
docker run -ti -d \
        --name=app \
        --hostname=bee90847ad27 \
        --env=spring.profiles.active=test \
        --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
        --env=LANG=C.UTF-8 \
        --volume=/home/log:/log:rw \
        --volume=/tmp \
        --volume=/log \
        --network=app_bridge \
        -p 8080:8080 \
        --restart=always \
        app:1.0 
```