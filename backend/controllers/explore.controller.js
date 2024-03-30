export const explorePopularRepos=async (req,res)=>{
    const {language}=req.params;

    try {
        //5000 requests per hour for authenticated request that is why i have done authorization here
        const response=await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,{
				headers:{
					authorization:`token ${process.env.GITHUB_API_KEY}`,//these is how we use env in nodejs server
				}
			}
		)
			const data=await response.json();
            //console.log(data);
            res.status(200).json({repos:data.items})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}