(async()=>{
    await populateArticles();
})()


async function populateArticles(){
    const response = await fetch("https://blog.jomejourney-portal.com/api/blogs/fetch");
    const data = await response.json()
    const {blogs} = data
    blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const blog_container = document.getElementById("blogs-container");
    blog_container.innerHTML = ""
    for (let i = 0; i < blogs.length && i < 4; i++) {
        const blog = blogs[i];
        blog_container.innerHTML += `
            <div class="col">
                <div class="blogs-cards">
                    <div class="blogs-thiumbnail">
                        <a href="single-post/single-post-page/?id=${blog.id}" target="_blank"><img src="${blog.featImg}" alt=""></a>
                    </div>
                    <div class="blogs-content-container">
                        <p>
                            <span class="category">Latest News Articles</span>
                        </p>
                        <div class="post-title">
                            <h4 class="title"><a href="single-post/single-post-page/?id=${blog.id}" target="_blank">${blog.heading}</a></h4>
                        </div>
                        <p class="date">${blog.created_at.split("T")[0]}</p>
                    </div>
                </div>
            </div>
        `
    }
}