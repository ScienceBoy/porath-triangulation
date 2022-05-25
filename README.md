How to recursively subdivide and triangulate a flat convex area, which is defined by a number of points
========================================================================================================

There are known algorithms available to subdivide and to triangulate areas defined by polygons or points. There implementation is often complex and their execution cost expensive. For the case of flat convex areas, we demonstrate here a simple fast recursive algorithm, which avoids overlapping of triangles and can easily be implemented in any programming language.

Introduction
------------
3d objects are often used in CAD (Computer Added Design), Computer Graphics, Anima-tions as well as Finite Element methods (FEM). 
	For describing, visualizing and editing of 3d objects their surfaces need to be subdi-vided in order to have small flat areas. There are known algorithms available to subdivide surfaces into areas and polygons (e.g. [Loo87]) and to triangulate surfaces (e.g. [Del34]). 
	Often, a surface is a flat convex area, i.e. it does not show an indent and therefore it contains the whole line segment of two points of this area, as depicted in the follow-ing Fig. 1. 

![grafik](https://user-images.githubusercontent.com/101653815/167586316-15c439a0-9b28-48b7-88e4-b728bbba7629.png)

Figure 1: The whole line segment between two points A and B lies within the convex area if A and B are within this area

For such a convex, flat area, the following steps can be used to triangulate it recursively into an appropriate number of triangles.

Steps to triangulate an area defined by n points
------------------------------------------------
We assume, there are n points P1…Pn distrib-uted in a flat plane, see Fig. 2. 
1.	Create a central point M around the n points P1…Pn. Because those n points de-fine a flat area, which is convex by defini-tion, we can assume without loss of gen-erality, that those points P1…Pn are all dis-tributed around their central point M and all connection lines from M to each point lie within this area. 

![grafik](https://user-images.githubusercontent.com/101653815/167586387-6ae06b3f-c999-488a-9556-fa872767e0b1.png)

Figure 2: 5 points P1...P5 around their central point M

2.	Sort the points P1…Pn by the angles α1… αn, which they span between the horizon-tal line, defined by the central point M and the respective connection lines from central point M to each point P1…Pn, see example α5 in Fig. 3.
 
![grafik](https://user-images.githubusercontent.com/101653815/167586515-46272e45-5d66-45c1-be81-499ba0062035.png)

Figure 3: The 5 points sorted by angle, which they span to the center point

3.	In the possible case that two angles are exactly the same (see Fig. 4 as an ex-ample), move the central point M by a random small shift horizontally and / or vertically, then repeat step number 2.
 
![grafik](https://user-images.githubusercontent.com/101653815/167586557-01d282ac-5fea-49ac-9a8b-a5975a9c940f.png)

Figure 4: Situation, where the angles to the points are equal and therefore ordering is not successful. A small shift of the central pointis is required (incdicated by the new red central point).

4.	Based on the ordered points P1…Pn, cre-ate a triangle T1 with the central point M as the first triangle corner, the point P1 as the second corner and the neighbour point P2 as the third corner, see Fig. 5.

5.	Continue creating triangles T2...Tn with the corners M / P2 / P3, then M / P3 / P4, etc. The last triangle will be created by com-bining M / Pn / P1.

![grafik](https://user-images.githubusercontent.com/101653815/167586590-5f338ca6-6ab8-4627-afc1-84de9bab87ce.png)

Figure 5: Created triangles from central point M to all points P1...Pn

6.	Take the corners of each of the triangles T1…Tn as new set of points P1…P3 and start the same procedure with step number 1 for these sets of points. To avoid double counting and overlapping triangles, delete the original triangles T1…Tn after having created the new subdivided triangles. 
See the results of the following two re-cursion levels in Fig. 6 and Fig. 7.

By applying this recursive procedure on such ordered points, it is assured that there is no overlapping of triangles.

![grafik](https://user-images.githubusercontent.com/101653815/167588655-226c682f-e716-4bff-a98d-09a65c5cabc9.png)

Figure 6: Second recursion level applied. Each triangle was divided into 3 new triangles
 
![grafik](https://user-images.githubusercontent.com/101653815/167588686-09116319-bc93-4a72-b813-4d23bfb96304.png)

Figure 7: Third recursion level applied. Each triangle was divided into 3 new triangles, which were divided into another 3 triangles


Remark
------
After the triangulation, the Delauney-Flipping can be applied to increase and therefore improve the angles of the triangles. One file in this repository shows how to call the Delaunay-Flipping API.

References
----------
[Loo87] Charles Loop: Smooth Subdivision Surfaces Based on Triangles, M.S. Mathematics thesis, University of Utah, 1987

[Del34] Boris N. Delaunay: Sur la sphère vide. In: Bulletin of Academy of Sciences. 7, Nr. 6, 1934, S. 793–800
