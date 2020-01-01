FROM node:11.1.0

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@6.4.1 && npm install -g nodemon

ENV HOME=/home/app

COPY --chown=app:app package.json npm-shrinkwrap.json $HOME/board/

USER app
WORKDIR $HOME/board
RUN npm cache verify && npm install --silent --progress=false

USER root
COPY --chown=app:app . $HOME/board 

USER app

CMD ["npm","start"]