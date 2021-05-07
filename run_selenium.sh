docker network create grid
docker run -d -p 4442-4444:4442-4444 --net grid --name selenium-hub selenium/hub:4.0.0-beta-3-20210426
docker run -d --net grid -e SE_EVENT_BUS_HOST=selenium-hub \
    -e SE_EVENT_BUS_PUBLISH_PORT=4442 \
    -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \
    -v /dev/shm:/dev/shm \
    --name se-chrome \
    selenium/node-chrome:4.0.0-beta-3-20210426
docker run -d --net grid -e SE_EVENT_BUS_HOST=selenium-hub \
    -e SE_EVENT_BUS_PUBLISH_PORT=4442 \
    -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \
    -v /dev/shm:/dev/shm \
    --name se-edge \
    selenium/node-edge:4.0.0-beta-3-20210426
docker run -d --net grid -e SE_EVENT_BUS_HOST=selenium-hub \
    -e SE_EVENT_BUS_PUBLISH_PORT=4442 \
    -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \
    -v /dev/shm:/dev/shm \
    --name se-firefox \
    selenium/node-firefox:4.0.0-beta-3-20210426
docker run -d --net grid -e SE_EVENT_BUS_HOST=selenium-hub \
    -e SE_EVENT_BUS_PUBLISH_PORT=4442 \
    -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \
    -v /dev/shm:/dev/shm \
    --name se-opera \
    selenium/node-opera:4.0.0-beta-3-20210426