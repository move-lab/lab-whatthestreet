cities=( "berlin" "boston" "johannesburg" "moscow" "stuttgart" "amsterdam" "budapest" "copenhagen" "rome" "singapore" "tokyo" "barcelona" "beijing" "helsinki" "hongkong" "jakarta" "newyork" "portland" "sanfrancisco" "vienna" "chicago" )
# cities=( "berlin" "boston" "johannesburg" "moscow" "stuttgart" "amsterdam" "budapest" "copenhagen" "rome" "singapore" "tokyo" )

for city in "${cities[@]}"
do
  mongorestore --nsInclude ${city}'_coiled.*' --nsFrom ${city}'_coiled.$collection$' --nsTo ${city}'_coiled_2.$collection$' --gzip --archive=${city}/coils\ MongoDB\ Dump/${city}_coiled.gz
done
