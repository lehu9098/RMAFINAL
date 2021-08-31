export default
{
  computed:{
    filterBlogs:function()
      {
        return this.BlogArray.filter((blog) => { //blog is each individual blog we are looping through
          return blog.title.match(this.search)
        });
      }
    },
}
