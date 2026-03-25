# Enhancement Example
This is a simple database, Spring boot and simple frontend example of a single entity called enhancements.

## Setup 
1. Setup your db e.g. run the SQL script (e.g. in pgAdmin)
2. Open up enhancement-api as its own project
3. update the application.properties to mach your db username and password. 
4. If you want to use the env variable like i use in this example do the following:
   1. Double tap shift to open menu search
   2. Find edit configuration
   3. Open for this project, probably: EnhancementApiApplication
   4. modify -> operating system -> environment variables
   5. add in your variable name and password POSTGRES_PASSWORD=your password