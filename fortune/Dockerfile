FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y fortune
COPY ["fortuneloop.sh", "./bin"]
ENTRYPOINT [ "bash", "bin/fortuneloop.sh" ]
CMD [ "10" ]