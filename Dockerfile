FROM python:3.8-slim-buster
WORKDIR /AIShapeDetector
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
