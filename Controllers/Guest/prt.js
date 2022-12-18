const cat= [
    {
        "_id": "639e124e0652e7d874f56f90",
        "name": "Mens Fashion",
        "__v": 0
    },
    {
        "_id": "639e12a00652e7d874f56f9b",
        "name": "Electronic Devices",
        "__v": 0
    },
    {
        "_id": "639e12e70652e7d874f56fa6",
        "name": "Electronic Accessories",
        "__v": 0
    },
    {
        "_id": "639e13290652e7d874f56fae",
        "name": "Beauty and Health",
        "__v": 0
    }
]
const sub = [
    {
        "_id": "639e126c0652e7d874f56f93",
        "cat": "639e124e0652e7d874f56f90",
        "name": "T-Shirt",
        "__v": 0
    },
    {
        "_id": "639e127c0652e7d874f56f96",
        "cat": "639e124e0652e7d874f56f90",
        "name": "Polo-Shirt",
        "__v": 0
    },
    {
        "_id": "639e128e0652e7d874f56f99",
        "cat": "639e124e0652e7d874f56f90",
        "name": "Jeans",
        "__v": 0
    },
    {
        "_id": "639e12bc0652e7d874f56f9e",
        "cat": "639e12a00652e7d874f56f9b",
        "name": "Mobile",
        "__v": 0
    },
    {
        "_id": "639e12c50652e7d874f56fa1",
        "cat": "639e12a00652e7d874f56f9b",
        "name": "Laptop",
        "__v": 0
    },
    {
        "_id": "639e12cf0652e7d874f56fa4",
        "cat": "639e12a00652e7d874f56f9b",
        "name": "Watche",
        "__v": 0
    },
    {
        "_id": "639e13010652e7d874f56fa9",
        "cat": "639e12e70652e7d874f56fa6",
        "name": "Mobile Accessories",
        "__v": 0
    },
    {
        "_id": "639e13100652e7d874f56fac",
        "cat": "639e12e70652e7d874f56fa6",
        "name": "Laptop Accessories",
        "__v": 0
    },
    {
        "_id": "639e13440652e7d874f56fb1",
        "cat": "639e13290652e7d874f56fae",
        "name": "Baaht and Body",
        "__v": 0
    },
    {
        "_id": "639e137c0652e7d874f56fb4",
        "cat": "639e13290652e7d874f56fae",
        "name": "beauty Tools",
        "__v": 0
    },
    {
        "_id": "639e138f0652e7d874f56fb7",
        "cat": "639e13290652e7d874f56fae",
        "name": "Fragrances",
        "__v": 0
    }
]



var Allcat = cat.map((e)=>{
    var newmap = e
    console.log(newmap)
    newmap["sub"] = sub.filter((x)=>{
    if(e._id==x.cat){
        return x
    }
    console.log(newmap)
    
})
return newmap
})

console.log(Allcat)