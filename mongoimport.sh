cities=( "berlin" "boston" "johannesburg" "moscow" "stuttgart" "amsterdam" "budapest" "copenhagen" "rome" "singapore" "tokyo" )
#new cities
cities=( "barcelona" "beijing" "helsinki" "hongkong" "jakarta" "newyork" "portland" "sanfrancisco" "vienna" )
for city in "${cities[@]}"
do
#   unzip ${city}/coils\ MongoDB\ Dump/${city}_coiled.zip
   mongorestore --drop -d ${city}_coiled ${city}_coiled/streets.bson
   mongorestore --drop -d ${city}_coiled ${city}_coiled/railtracks.bson
   mongorestore --drop -d ${city}_coiled ${city}_coiled/railtracksparking.bson
   mongorestore --drop -d ${city}_coiled ${city}_coiled/biketracks.bson
done
