FROM python:3.10-alpine3.16

WORKDIR /app

COPY ./data-service /app

RUN pip install -r requirements.txt

ENTRYPOINT [ "python" ]

CMD [ "main.py" ]