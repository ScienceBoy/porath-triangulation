<!-- Triangulation implementation -->
<!-- Ron Porath, 2022 -->
<!-- License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/) -->

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
    </head>
    <body>
        <!-- Setup the JavaScript canvas to draw the points and triangles -->
        <canvas id="Canvas" style="width: 100%; height: 100%; border: 0px">
        </canvas>
        <script>
            // Setup the canvas drawing context
            var canvas = document.getElementById("Canvas");
            var rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            var DrawingContext = canvas.getContext("2d");
            DrawingContext.scale(1, 1);

            // Function to draw text on the canvas
            function drawText(x, y, text, DrawingContext, color, textAlign) {
                DrawingContext.fillStyle = color;
                DrawingContext.lineWidth = 1;
                DrawingContext.font = "12px Arial";
                DrawingContext.textAlign = textAlign;
                DrawingContext.fillText(text, x, y);
            }

            // Function to draw a circle on the canvas
            function drawCircle(
                x,
                y,
                r,
                startAngle,
                endAngle,
                thickness,
                DrawingContext,
                color,
                fill
            ) {
                var pi = 3.1415;
                DrawingContext.beginPath();
                DrawingContext.fillStyle = color;
                DrawingContext.strokeStyle = color;
                DrawingContext.lineWidth = thickness;
                DrawingContext.arc(
                    x,
                    y,
                    r,
                    (startAngle / 360) * 2 * pi,
                    (endAngle / 360) * 2 * pi
                );
                DrawingContext.stroke();
                if (fill == true) {
                    DrawingContext.fill();
                }
            }

            // Function to draw a line on the canvas
            function drawLine(
                x1,
                y1,
                x2,
                y2,
                thickness,
                DrawingContext,
                color
            ) {
                DrawingContext.beginPath();
                DrawingContext.strokeStyle = color;
                DrawingContext.lineWidth = thickness;
                DrawingContext.moveTo(x1, y1);
                DrawingContext.lineTo(x2, y2);
                DrawingContext.stroke();
            }

            // Function to calculate the distance between two points (x1, y1) and (x2, y2)
            function Distance(x1, y1, x2, y2) {
                return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            }

            // Function to create the points randomly in 2d
            function CreatePoints(NumberOfNewPoints) {
                var pointlist = [];
                for (x2 = 0; x2 < NumberOfNewPoints; x2++) {
                    var randomZahl = Math.random();
                    var point_x = 400 + Math.cos(randomZahl * 2 * 3.14) * 200;
                    var point_y = 400 + Math.sin(randomZahl * 2 * 3.14) * 200;
                    pointlist.push({ x: point_x, y: point_y });
                }
                return pointlist;
            }

            // Function to draw triangles onto the canvas
            function drawTriangles() {
                for (x25 = 0; x25 < triangles.length; x25++) {
                    drawCircle(
                        triangles[x25].P1x,
                        triangles[x25].P1y,
                        2,
                        0,
                        360,
                        1,
                        DrawingContext,
                        "#FF0000",
                        true
                    );
                    drawCircle(
                        triangles[x25].P2x,
                        triangles[x25].P2y,
                        2,
                        0,
                        360,
                        1,
                        DrawingContext,
                        "#FF0000",
                        true
                    );
                    drawCircle(
                        triangles[x25].P3x,
                        triangles[x25].P3y,
                        2,
                        0,
                        360,
                        1,
                        DrawingContext,
                        "#FF0000",
                        true
                    );
                    drawLine(
                        triangles[x25].P1x,
                        triangles[x25].P1y,
                        triangles[x25].P2x,
                        triangles[x25].P2y,
                        1,
                        DrawingContext,
                        "#000000"
                    );
                    drawLine(
                        triangles[x25].P2x,
                        triangles[x25].P2y,
                        triangles[x25].P3x,
                        triangles[x25].P3y,
                        1,
                        DrawingContext,
                        "#000000"
                    );
                    drawLine(
                        triangles[x25].P3x,
                        triangles[x25].P3y,
                        triangles[x25].P1x,
                        triangles[x25].P1y,
                        1,
                        DrawingContext,
                        "#000000"
                    );
                }
            }

            // Function to calculate a ordered index list based on list of input numbers
            function SortAngles(toSort, OrderIndex) {
                for (x6 = 0; x6 < toSort.length; x6++) {
                    OrderIndex[x6] = x6;
                }
                OrderIndex.sort(function (a, b) {
                    return toSort[b] - toSort[a];
                });
            }

            // Function to create triangles based on a list of points in the array pointsHere
            function createTriangles(pointsHere) {
                var AngleToCentralPoint = [];
                var OrderIndex = [];
                var sum_x = 0;
                var sum_y = 0;
                var CentralPoint_x = 0;
                var CentralPoint_y = 0;

                // Calculate the coordinates of the central point to the input points
                for (x3 = 0; x3 < pointsHere.length; x3++) {
                    sum_x += pointsHere[x3].x;
                    sum_y += pointsHere[x3].y;
                }
                CentralPoint_x = sum_x / pointsHere.length;
                CentralPoint_y = sum_y / pointsHere.length;

                // Calculate the angles for each point
                for (x4 = 0; x4 < pointsHere.length; x4++) {
                    var Hypothenuse = Distance(
                        pointsHere[x4].x,
                        pointsHere[x4].y,
                        CentralPoint_x,
                        CentralPoint_y
                    );

                    var AdjacentSide = Math.abs(
                        pointsHere[x4].x - CentralPoint_x
                    );

                    if (
                        pointsHere[x4].x > CentralPoint_x &&
                        pointsHere[x4].y > CentralPoint_y
                    )
                        AngleToCentralPoint[x4] =
                            Math.asin(AdjacentSide / Hypothenuse) +
                            Math.PI / 2 +
                            Math.PI;

                    if (
                        pointsHere[x4].x < CentralPoint_x &&
                        pointsHere[x4].y > CentralPoint_y
                    )
                        AngleToCentralPoint[x4] =
                            -Math.asin(-AdjacentSide / -Hypothenuse) +
                            Math.PI +
                            Math.PI / 2;

                    if (
                        pointsHere[x4].x < CentralPoint_x &&
                        pointsHere[x4].y < CentralPoint_y
                    )
                        AngleToCentralPoint[x4] =
                            Math.asin(-AdjacentSide / -Hypothenuse) +
                            Math.PI / 2;

                    if (
                        pointsHere[x4].x > CentralPoint_x &&
                        pointsHere[x4].y < CentralPoint_y
                    )
                        AngleToCentralPoint[x4] =
                            Math.PI / 2 - Math.asin(AdjacentSide / Hypothenuse);
                }

                // Move the central point by a fraction of 1, to avoid two equal angles
                CentralPoint_x = CentralPoint_x * (Math.random() / 100 + 1);
                CentralPoint_y = CentralPoint_y * (Math.random() / 100 + 1);

                // Call the sorting function to receive an ordered index list in the array OrderIndex
                SortAngles(AngleToCentralPoint, OrderIndex);

                // Create triangles based on the ordered index list
                for (x4 = 0; x4 < pointsHere.length - 1; x4++) {
                    triangles.push({
                        P1x: CentralPoint_x,
                        P1y: CentralPoint_y,
                        P2x: pointsHere[OrderIndex[x4]].x,
                        P2y: pointsHere[OrderIndex[x4]].y,
                        P3x: pointsHere[OrderIndex[x4 + 1]].x,
                        P3y: pointsHere[OrderIndex[x4 + 1]].y,
                        ID: triangles.length,
                    });
                }
                // Create the last triangle with one corner being the first point (indexed with OrderIndex[0])
                triangles.push({
                    P1x: pointsHere[OrderIndex[pointsHere.length - 1]].x,
                    P1y: pointsHere[OrderIndex[pointsHere.length - 1]].y,
                    P2x: pointsHere[OrderIndex[0]].x,
                    P2y: pointsHere[OrderIndex[0]].y,
                    P3x: CentralPoint_x,
                    P3y: CentralPoint_y,
                    ID: triangles.length,
                });
            }

            // Main program, starting by defining the number of points and the recursion depth
            var NumberOfPoints = 10;
            var Depth = 10;
            var triangles = [];

            // Repeat steps for each depth level
            for (depthLevel = 0; depthLevel < Depth; depthLevel++) {
                var points = [];
                // Call function to create the random points, to create the triangles and to draw the triangles
                // Starting with depth level 0
                if (depthLevel == 0) {
                    points = CreatePoints(NumberOfPoints);
                    createTriangles(points);
                    drawTriangles();
                }
                // Continuing with depth level 1...depth-1
                // For each triangles, recursively repeat the creation of sub-triangles
                else {
                    var NumberOfTriangles = triangles.length;
                    // Create a new set of points from triangle corners and create sub-triangles with this set of points
                    for (
                        NewTriangle = 0;
                        NewTriangle < NumberOfTriangles;
                        NewTriangle++
                    ) {
                        points = [];
                        points.push({
                            x: triangles[NewTriangle].P1x,
                            y: triangles[NewTriangle].P1y,
                        });
                        points.push({
                            x: triangles[NewTriangle].P2x,
                            y: triangles[NewTriangle].P2y,
                        });
                        points.push({
                            x: triangles[NewTriangle].P3x,
                            y: triangles[NewTriangle].P3y,
                        });
                        createTriangles(points);
                        drawTriangles();
                    }
                    // Remove parent triangle
                    for (
                        TriangleToDelete = NumberOfTriangles - 1;
                        TriangleToDelete >= 0;
                        TriangleToDelete--
                    ) {
                        triangles.splice(TriangleToDelete, 1);
                    }
                }
                drawText(
                    20,
                    depthLevel * 20 + 20,
                    "Number of Triangles after recursion " +
                        depthLevel +
                        ": " +
                        triangles.length,
                    DrawingContext,
                    "#000000",
                    "Left"
                );
            }
        </script>
    </body>
</html>
