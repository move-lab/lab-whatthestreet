cities=( "berlin" "boston" "johannesburg" "moscow" "stuttgart" "amsterdam" "budapest" "copenhagen" "rome" "singapore" "tokyo" "barcelona" "beijing" "helsinki" "hongkong" "jakarta" "newyork" "portland" "sanfrancisco" "vienna" "chicago" "losangeles" )

for city in "${cities[@]}"
do
   mkdir -p ./static/cities/${city}/lanes
   cp /Volumes/Data/TempMoovel/newdata/${city}/bike-tracks.svg ./static/cities/${city}/lanes/bike.svg
   cp /Volumes/Data/TempMoovel/newdata/${city}/rail-tracks.svg ./static/cities/${city}/lanes/rail.svg
   cp /Volumes/Data/TempMoovel/newdata/${city}/car-tracks.svg ./static/cities/${city}/lanes/car.svg

   mkdir -p ./static/cities/${city}/parking
   cp /Volumes/Data/TempMoovel/newdata/${city}/bike-parking.svg ./static/cities/${city}/parking/bike.svg
   cp /Volumes/Data/TempMoovel/newdata/${city}/rail-parking.svg ./static/cities/${city}/parking/rail.svg
   cp /Volumes/Data/TempMoovel/newdata/${city}/car-parking.svg ./static/cities/${city}/parking/car.svg
done
