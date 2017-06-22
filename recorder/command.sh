echo "start"
CITY=$1
MOBILITY_TYPE=$2
ID=$3

rm -rf "$CITY"_"$MOBILITY_TYPE"_"$ID"/
phantomjs record.js $CITY $MOBILITY_TYPE $ID
ffmpeg -y -r 20 -f image2 -s 512x512 -i "$CITY"_"$MOBILITY_TYPE"_"$ID"/"$CITY"_"$MOBILITY_TYPE"_"$ID"_%d.png -vcodec libx264 -crf 25  -pix_fmt yuv420p "$CITY"_"$MOBILITY_TYPE"_"$ID".mp4
rm -rf "$CITY"_"$MOBILITY_TYPE"_"$ID"/
echo "ready"
