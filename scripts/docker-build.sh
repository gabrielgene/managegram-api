docker build -t gabrielgene/insta-js .
docker tag gabrielgene/insta-js gabrielgene/insta-js:$(git rev-parse HEAD)
docker tag gabrielgene/insta-js gabrielgene/insta-js:local3
