// Delaunay-Flipping API
// Ron Porath, 2022
// License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)

var NumberOfPoints = 0;
var NumberOfTriangles = 0;

// Main program
// Input:
// - Array points_x for the x-coords of the points
// - Array points_y for the y-coords of the points
// - Array triangles_Corner1 with the point numbers for the 1st corners
// - Array triangles_Corner2 with the point numbers for the 2nd corners
// - Array triangles_Corner3 with the point numbers for the 3rd corners
// - NumberToStop as upper limit of iterations of the algorithm to avoid infinite loops in edge cases
function DelaunayFlipping(points_x, points_y, triangles_Corner1, triangles_Corner2, triangles_Corner3, NumberToStop) {
  var flipcounter = 0;
  var NumberOfCalls = 0;
  NumberOfPoints = points_x.length;
  NumberOfTriangles = triangles_Corner1.length;

  ShowTriangles(-1, '#ff0000');

  // Check each triangle t for possible flipping
  for (var t = 0; t < NumberOfTriangles; t++) {
    //Select each edge of triangle t
    for (var edge = 0; edge < 3; edge++) {
      if (edge == 0) {
        var Pi = triangles_Corner1[t];
        var Pj = triangles_Corner2[t];
        var Pk = triangles_Corner3[t];
      } else if (edge == 1) {
        var Pi = triangles_Corner2[t];
        var Pj = triangles_Corner3[t];
        var Pk = triangles_Corner1[t];
      } else if (edge == 2) {
        var Pi = triangles_Corner3[t];
        var Pj = triangles_Corner1[t];
        var Pk = triangles_Corner2[t];
      }

      // Find another triangle tria, which shares two corners with triangle t
      // Name the third corner of this triangle tria as 'Ph'
      var tria = -1;
      var Ph = -1;
      for (var t2 = 0; t2 < NumberOfTriangles; t2++) {
        if (t2 != t) {
          if ((triangles_Corner1[t2] == Pi && triangles_Corner2[t2] == Pj) || (triangles_Corner1[t2] == Pj && triangles_Corner2[t2] == Pi)) {
            // The shared corners are number 1 & 2, therefore Ph = corner3
            Ph = triangles_Corner3[t2];
            tria = t2;
            t2 = NumberOfTriangles;
          } else if ((triangles_Corner1[t2] == Pi && triangles_Corner3[t2] == Pj) || (triangles_Corner1[t2] == Pj && triangles_Corner3[t2] == Pi)) {
            // The shared corners are number 1 & 3, therefore Ph = corner2
            Ph = triangles_Corner2[t2];
            tria = t2;
            t2 = NumberOfTriangles;
          } else if ((triangles_Corner2[t2] == Pi && triangles_Corner3[t2] == Pj) || (triangles_Corner2[t2] == Pj && triangles_Corner3[t2] == Pi)) {
            // The shared corners are number 2 & 3, therefore Ph = corner1
            Ph = triangles_Corner1[t2];
            tria = t2;
            t2 = NumberOfTriangles;
          }
        }
      }

      // If triangle with two shared corners was found, check if flipping is useful
      if (tria > -1) {
        NumberOfCalls++;
        if (NumberOfCalls < NumberToStop && LegalizeEdge(Pk, Pi, Pj, Ph, t, tria) == 1) {
          // If a flipping was performed, the konfiguration of the triangles was changed and therefore we have to start the check again with the first triangle
          t = 0;
          flipcounter++;
        }
      }
    }
  }

  console.log('Number of flippings: ', flipcounter);
  ShowTriangles(-1, '#000000');
}

// Function to draw a circle
function drawCircle(x, y, r, startAngle, endAngle, thickness, DrawingContext, color, fill) {
  var pi = 3.1415;
  DrawingContext.beginPath();
  DrawingContext.fillStyle = color;
  DrawingContext.strokeStyle = color;
  DrawingContext.lineWidth = thickness;
  DrawingContext.arc(x + 200, y, r, (startAngle / 360) * 2 * pi, (endAngle / 360) * 2 * pi);
  DrawingContext.stroke();
}

// Function to draw a line
function drawLine(x1, y1, x2, y2, thickness, DrawingContext, color) {
  DrawingContext.beginPath();
  DrawingContext.strokeStyle = color;
  DrawingContext.lineWidth = thickness;
  DrawingContext.moveTo(x1 + 200, y1);
  DrawingContext.lineTo(x2 + 200, y2);
  DrawingContext.stroke();
}

// Function to draw all or a specific Triangle
// Input:
// - Number = -1 for all triangles
// - Number > -1 for a specific triangle
function ShowTriangles(number, color) {
  if (number == -1) {
    DrawingContext.clearRect(0, 0, canvas.width, canvas.height);
  }
  for (var i = 0; i < NumberOfTriangles; i++) {
    if (number == -1 || i == number) {
      drawLine(points_x[triangles_Corner1[i]], points_y[triangles_Corner1[i]], points_x[triangles_Corner2[i]], points_y[triangles_Corner2[i]], 1, DrawingContext, color, true);
      drawLine(points_x[triangles_Corner2[i]], points_y[triangles_Corner2[i]], points_x[triangles_Corner3[i]], points_y[triangles_Corner3[i]], 1, DrawingContext, color, true);
      drawLine(points_x[triangles_Corner3[i]], points_y[triangles_Corner3[i]], points_x[triangles_Corner1[i]], points_y[triangles_Corner1[i]], 1, DrawingContext, color, true);
    }
  }
  for (var Ph = 0; Ph < NumberOfPoints; Ph++) {
    drawCircle(points_x[Ph], points_y[Ph], 5, 0, 360, 1, DrawingContext, '#ff22ff', false);
  }
}

// Function to check whether a Delaunay flipping of a common used edge of two triangles would increase the angles of the triangles
// Input:
// - LPr      = Third (not relevant) corner of the triangle t
// - LPi, LPj = Corners of the triangles t, which are checked for flipping
// - Ph       = Corner of the triangle tria, which has a common edge LPi, LPj with t. Taken as point outside of t
// - t        = Triangle, which is checked for flipping
// - tria     = Trianlge, which has a common edge with triangle t
function LegalizeEdge(LPr, LPi, LPj, Ph, t, tria) {
  //Calculate the mean point of the circumcircle around LPi, LPj, LPr
  var temp = MeanPoint(points_x[LPr], points_y[LPr], points_x[LPi], points_y[LPi], points_x[LPj], points_y[LPj]);
  if (temp == 0) {
    return 0;
  }
  var MeanPoint_x = temp.KM_x;
  var MeanPoint_y = temp.KM_y;

  // Calculate the radius of the circumcircle of the triangle t as distance from mean point to one of the corners of the triangle t, here taken as LPi
  var radius = Math.sqrt((points_x[LPi] - MeanPoint_x) * (points_x[LPi] - MeanPoint_x) + (points_y[LPi] - MeanPoint_y) * (points_y[LPi] - MeanPoint_y));

  // Calculate distance from mean point to the point Ph of the neighbour triangle tria
  var dist = Math.sqrt((points_x[Ph] - MeanPoint_x) * (points_x[Ph] - MeanPoint_x) + (points_y[Ph] - MeanPoint_y) * (points_y[Ph] - MeanPoint_y));

  // Check if distance to Ph smaller is than radius of the circumcircle of the triangle t
  if (dist < radius) {
    // Flip the edge from LPi, LPj to LPr, Ph
    triangles_Corner1[t] = LPr;
    triangles_Corner2[t] = Ph;
    triangles_Corner3[t] = LPj;
    triangles_Corner1[tria] = LPr;
    triangles_Corner2[tria] = Ph;
    triangles_Corner3[tria] = LPi;
    return 1;
  }
  return 0;
}

// Function to calculate the mean point for a circle given by three points on this circle
// The calculation uses a system of 3x3 linear equations, which is solved by means of cramer's rule
// Adapted from: avanitrachhadiya2155 (https://www.geeksforgeeks.org/system-linear-equations-three-variables-using-cramers-rule/)
function MeanPoint(p1x, p1y, p2x, p2y, p3x, p3y) {
  // Setup the system of linear equations
  let coeff = [
    [2 * p1x, 2 * p1y, 1, p1x * p1x + p1y * p1y],
    [2 * p2x, 2 * p2y, 1, p2x * p2x + p2y * p2y],
    [2 * p3x, 2 * p3y, 1, p3x * p3x + p3y * p3y],
  ];

  // Find solutions to this system of linear equations
  var temp = FindSolutionToLinEquSystem(coeff);

  // If a solution was found, return the resulting mean points
  if (temp != 0) {
    var KM_x = temp.x;
    var KM_y = temp.y;
    return { KM_x, KM_y };
  } else {
    return 0;
  }
}

// Function to find the determinant of a matrix given by the coefficients of the linear equations
// Adapted from: avanitrachhadiya2155 (https://www.geeksforgeeks.org/system-linear-equations-three-variables-using-cramers-rule/)
function DeterminantOfMatrix(mat) {
  let ans;
  ans = mat[0][0] * (mat[1][1] * mat[2][2] - mat[2][1] * mat[1][2]) - mat[0][1] * (mat[1][0] * mat[2][2] - mat[1][2] * mat[2][0]) + mat[0][2] * (mat[1][0] * mat[2][1] - mat[1][1] * mat[2][0]);
  return ans;
}

// Function to find the solution of a system of 3x3 linear equations using cramer's rule
// Adapted from: avanitrachhadiya2155 (https://www.geeksforgeeks.org/system-linear-equations-three-variables-using-cramers-rule/)
function FindSolutionToLinEquSystem(coeff) {
  // Matrix d using coeff as given in cramer's rule
  let d = [
    [coeff[0][0], coeff[0][1], coeff[0][2]],
    [coeff[1][0], coeff[1][1], coeff[1][2]],
    [coeff[2][0], coeff[2][1], coeff[2][2]],
  ];

  // Matrix d1 using coeff as given in cramer's rule
  let d1 = [
    [coeff[0][3], coeff[0][1], coeff[0][2]],
    [coeff[1][3], coeff[1][1], coeff[1][2]],
    [coeff[2][3], coeff[2][1], coeff[2][2]],
  ];

  // Matrix d2 using coeff as given in cramer's rule
  let d2 = [
    [coeff[0][0], coeff[0][3], coeff[0][2]],
    [coeff[1][0], coeff[1][3], coeff[1][2]],
    [coeff[2][0], coeff[2][3], coeff[2][2]],
  ];

  // Matrix d3 using coeff as given in cramer's rule
  let d3 = [
    [coeff[0][0], coeff[0][1], coeff[0][3]],
    [coeff[1][0], coeff[1][1], coeff[1][3]],
    [coeff[2][0], coeff[2][1], coeff[2][3]],
  ];

  // Calculate determinant of matrices d, d1, d2, d3
  let D = DeterminantOfMatrix(d);
  let D1 = DeterminantOfMatrix(d1);
  let D2 = DeterminantOfMatrix(d2);
  let D3 = DeterminantOfMatrix(d3);

  // Case 1: Coeff has a unique solution. Apply Cramer's rule
  if (D != 0) {
    let x = D1 / D;
    let y = D2 / D;
    let z = D3 / D;
    return { x, y };
  }
  // Case 2: There are infinite solutison or no solutions
  else {
    // Infinite solutions
    if (D1 == 0 && D2 == 0 && D3 == 0) {
      return 0;
    }
    // No solutions
    else if (D1 != 0 || D2 != 0 || D3 != 0) {
      return 0;
    }
  }
}

// Function to check if a point lies within the triangle ABC
// A point lies within the triangle if the number of intersections of a half-line with all triangle edges from the point in random direction is exactly 1
function PointInTriangle(Point, A, B, C) {
  // The three 3D corners A, B, C of the triangle
  var Ax = points_x[A];
  var Ay = points_y[A];
  var Az = 0;
  var Bx = points_x[B];
  var By = points_y[B];
  var Bz = 0;
  var Cx = points_x[C];
  var Cy = points_y[C];
  var Cz = 0;

  // The mid-points of each edges of the triangles
  var Mx = (Bx - Ax) / 2 + Ax;
  var My = (By - Ay) / 2 + Ay;
  var Mz = (Bz - Az) / 2 + Az;

  // The starting point of the half-line
  var Sx = points_x[Point];
  var Sy = points_y[Point];
  var Sz = 0;

  // Calculate the intersection points T1, T2, T3 and the fractions of distance R1, R2, R3 from one corner to the other
  var T1 = ((By - Sy) * Ax + (-Bx + Sx) * Ay + Bx * Sy - By * Sx) / ((My - Sy) * Ax + (Sx - Mx) * Ay + (Sy - My) * Bx + By * (Mx - Sx));
  var R1 = ((Sy - My) * Bx + By * (Mx - Sx) - Sy * Mx + Sx * My) / ((Sy - My) * Bx + By * (Mx - Sx) + Ax * My - Ax * Sy - Ay * Mx + Ay * Sx);

  var T2 = ((Cy - Sy) * Bx + (-Cx + Sx) * By + Cx * Sy - Cy * Sx) / ((My - Sy) * Bx + (Sx - Mx) * By + (Sy - My) * Cx + Cy * (Mx - Sx));
  var R2 = ((Sy - My) * Cx + Cy * (Mx - Sx) - Sy * Mx + Sx * My) / ((Sy - My) * Cx + Cy * (Mx - Sx) + Bx * My - Bx * Sy - By * Mx + By * Sx);

  var T3 = ((Ay - Sy) * Cx + (-Ax + Sx) * Cy + Ax * Sy - Ay * Sx) / ((My - Sy) * Cx + (Sx - Mx) * Cy + (Sy - My) * Ax + Ay * (Mx - Sx));
  var R3 = ((Sy - My) * Ax + Ay * (Mx - Sx) - Sy * Mx + Sx * My) / ((Sy - My) * Ax + Ay * (Mx - Sx) + Cx * My - Cx * Sy - Cy * Mx + Cy * Sx);

  // Count the number of intersections with edges of the triangle
  var NumberOfInterceptionsWithAreaEdges = 0;

  if (T1 >= 0 && R1 >= 0 && R1 <= 1) {
    NumberOfInterceptionsWithAreaEdges = NumberOfInterceptionsWithAreaEdges + 1;
  }

  if (T2 >= 0 && R2 >= 0 && R2 <= 1) {
    NumberOfInterceptionsWithAreaEdges = NumberOfInterceptionsWithAreaEdges + 1;
  }

  if (T3 >= 0 && R3 >= 0 && R3 <= 1) {
    NumberOfInterceptionsWithAreaEdges = NumberOfInterceptionsWithAreaEdges + 1;
  }

  // If there is only one intersection then return true
  if (NumberOfInterceptionsWithAreaEdges == 1) {
    return true;
  } else {
    return false;
  }
}
