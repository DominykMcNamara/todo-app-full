
   ` 
   CREATE TABLE todos (
        id SERIAL NOT NULL PRIMARY KEY,
        description VARCHAR(50) NOT NULL UNIQUE ,
        completed BOOLEAN NOT NULL DEFAULT false
    );
`
