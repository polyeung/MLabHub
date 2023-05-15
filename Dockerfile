# init a base image (Alpine is small linux distro)
FROM node:14.17.3-buster AS build
# define the present working directory
WORKDIR /docker-MLabHub
# copy over frontend content
COPY package.json /docker-MLabHub/package.json
COPY package-lock.json /docker-MLabHub/package-lock.json
# set up frontend, run inside the image
RUN npm install
COPY . .
RUN npm run build:watch

FROM python:3.10.5-alpine
WORKDIR /docker-MLabHub
COPY requirements.txt ./
COPY MLabHub /docker-MLabHub/MLabHub
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt

# copy the built application iver
COPY --from=build /docker-MLabHub/build /docker-MLabHub/static
CMD ["python3", "MLabHub"]