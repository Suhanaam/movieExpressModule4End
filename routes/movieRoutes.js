const express=require('express')
const router=express.Router()
const movies=require('../movie')

router.get('/',(req,res)=>{
    try {
        
        res.status(200).json(movies)

    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

router.get('/:id',(req,res)=>{
    try {
         const movieId=parseInt(req.params.id);
         const selectMovie=movies.find(m=>m.id===movieId)
          if(!selectMovie)
          {
            res.status(404).json({error:"movie not found"})

          }
       res.status(200).json(selectMovie)
        
    } catch (error) {
        res.status(404).json({error:error.message})
        
    }
})

router.post('/',(req,res)=>{
    try {
        
        const {title,genre,releaseYear,rating}=req.body;
        if(!title||!genre||!releaseYear||!rating){
            return res.status(400).json({error:"title,genre,release year and rating should be given"})
        }
        if(typeof releaseYear !=='number' || typeof rating !=='number' || rating <=0 )
        {
            return res.status(400).json({ error: "Valid 'release year and rating' is required" });

        }

        const newMovie=
        {
            id: movies.length ? movies[movies.length-1].id+1 :1,
            title,
            genre,
            releaseYear,
            rating,
        }
                     
        movies.push(newMovie)
        res.status(201).json({message:"movie added",movie:newMovie});
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
})

router.patch('/:id',(req,res)=>{
    try {
        const movieId=parseInt(req.params.id)
        const upMovie=movies.find(m=>m.id===movieId)
        if(!upMovie)
        {
            res.status(404).json({error:"movie not found"})
        }
        const {rating}=req.body
        if(rating)
        {
            upMovie.rating=rating

        }
        res.status(200).json(upMovie)
    } catch (error) 
    {

        res.status(500).json({error:error.message})        
    }
})

router.delete('/:id',(req,res)=>{
    try {

        const movieId=parseInt(req.params.id)
        
        const movieIndex=movies.findIndex(m=>m.id===movieId)
        if(movieIndex==-1)
        {
            res.status(404).json({error:"movie not found"})
        }
        const deletedMovie=movies.splice(movieIndex,1) 

        
        res.status(200).json({message:"movie deleted",movie:deletedMovie})
        
        
    } catch (error) {
        res.status(404).json({error:error.message})
        
    }
        
})




module.exports=router