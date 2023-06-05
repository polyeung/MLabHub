# Stage 1 - Frontend
FROM node:16 AS webpack-builder

WORKDIR /usr/src/app

COPY src/package*.json .
RUN npm install

COPY src .
CMD npm run build


# Stage 2 - Application

FROM python:3.10

ARG ENVIRONMENT=PRODUCTION

ENV GUNICORN_WORKERS=2 \
    GUNICORN_THREADS=4 \
    PYTHONUNBUFFERED=1 \
    WEB_CONCURRENCY=5 \
    PIP_DISABLE_PIP_VERSION_CHECK=1



RUN apt-get --allow-insecure-repositories update && export DEBIAN_FRONTEND=noninteractive && \
    apt-get install -y python3 default-libmysqlclient-dev build-essential libaio1 && \
    apt-get upgrade -y

WORKDIR /usr/src/app

COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
RUN pip install django-filter
COPY . /usr/src/app

EXPOSE 8000

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]

CMD ["sh", "-c", "gunicorn MLabHubdjango.asgi:application -b=0.0.0.0:8000 -w=${GUNICORN_WORKERS} --threads=${GUNICORN_THREADS} -k uvicorn.workers.UvicornWorker"]