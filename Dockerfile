FROM node:20
WORKDIR /workspace

RUN npm install -g pnpm
RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/MicroWebStacks/astro-big-doc.git /astro-big-doc
WORKDIR /astro-big-doc

RUN pnpm install

EXPOSE 3001

RUN pnpm astro telemetry disable

ENTRYPOINT ["pnpm", "run"]
CMD ["build"]
