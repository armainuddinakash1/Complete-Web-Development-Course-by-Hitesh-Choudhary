function fetchPostData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Post Data");
        }, 3000);
    });
}
function fetchCommentData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Comment Data");
        }, 4000);
    });
}

async function GetBlogData() {
    try {
        console.log("Fetching Blog Data...");
        // const postData = await fetchPostData();
        // const CommentData = await fetchCommentData();
        const [postData, CommentData] = await Promise.all([
            fetchPostData(),
            fetchCommentData(),
        ]);
        console.log(postData);
        console.log(CommentData);
        console.log("Data Fetched Successfully");
    } catch (error) {
        console.error("Error Fetching Data");
    }
}
GetBlogData();
