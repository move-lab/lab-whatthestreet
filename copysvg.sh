cities=( "berlin" "boston" "johannesburg" "moscow" "stuttgart" )

for city in "${cities[@]}"
do
   mkdir -p ./static/cities/${city}/lanes
   cp ../WhatTheStreet/data/${city}/bike-tracks.svg ./static/cities/${city}/lanes/bike.svg
   cp ../WhatTheStreet/data/${city}/rail-tracks.svg ./static/cities/${city}/lanes/rail.svg
   cp ../WhatTheStreet/data/${city}/car-tracks.svg ./static/cities/${city}/lanes/car.svg

   mkdir -p ./static/cities/${city}/parking
   cp ../WhatTheStreet/data/${city}/bike-parking.svg ./static/cities/${city}/parking/bike.svg
   cp ../WhatTheStreet/data/${city}/rail-parking.svg ./static/cities/${city}/parking/rail.svg
   cp ../WhatTheStreet/data/${city}/car-parking.svg ./static/cities/${city}/parking/car.svg
done
