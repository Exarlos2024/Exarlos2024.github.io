(()=>{async function d(t){t.preventDefault();t={title:document.getElementById("post-title").value,slug:document.getElementById("post-slug").value||document.getElementById("post-title").value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),date:document.getElementById("post-date").value||(new Date).toISOString().split("T")[0],content:document.getElementById("post-content").value,excerpt:document.getElementById("post-excerpt").value,categories:document.getElementById("post-categories").value.split(",").map(t=>t.trim()).filter(Boolean),tags:document.getElementById("post-tags").value.split(",").map(t=>t.trim()).filter(Boolean)};try{document.getElementById("post-id").value?(await window.blogAPI.updatePost(document.getElementById("post-slug").value,t),window.showNotification&&showNotification("Post updated successfully","success")):(await window.blogAPI.createPost(t),window.showNotification&&showNotification("Post created successfully","success")),window.closePostEditModal(),void 0!==window.location&&window.location.reload()}catch(t){console.error("Error saving post:",t),window.showNotification&&showNotification("Error saving post: "+t.message,"error")}}window.openPostEditModal=function(t){let e=document.getElementById("post-edit-modal");var o;e||((e=document.createElement("div")).id="post-edit-modal",e.innerHTML=`
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="edit-modal-title">Edit Post</h3>
          <button class="modal-close" data-action="close-edit">&times;</button>
        </div>
        <div class="modal-body">
          <form id="post-edit-form">
            <input type="hidden" id="post-id">
            <div class="form-group">
              <label for="post-title">Title</label>
              <input type="text" id="post-title" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="post-slug">Slug</label>
                <input type="text" id="post-slug">
              </div>
              <div class="form-group">
                <label for="post-date">Date</label>
                <input type="date" id="post-date">
              </div>
            </div>
            <div class="form-group">
              <label for="post-categories">Categories (comma-separated)</label>
              <input type="text" id="post-categories">
            </div>
            <div class="form-group">
              <label for="post-tags">Tags (comma-separated)</label>
              <input type="text" id="post-tags">
            </div>
            <div class="form-group">
              <label for="post-content">Content (Markdown)</label>
              <textarea id="post-content" required></textarea>
            </div>
            <div class="form-group">
              <label for="post-excerpt">Excerpt</label>
              <textarea id="post-excerpt"></textarea>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Save Post</button>
              <button type="button" class="btn btn-secondary" data-action="close-edit">Cancel</button>
            </div>
          </form>
        </div>
      </div>`,document.body.appendChild(e),e.addEventListener("click",t=>{!t.target.classList.contains("modal-overlay")&&"close-edit"!==t.target.dataset.action||closePostEditModal()}),document.getElementById("post-edit-form").addEventListener("submit",d)),document.getElementById("edit-modal-title").textContent=t?"Edit Post":"Create Post",t?(document.getElementById("post-id").value=t.id||"",document.getElementById("post-title").value=t.title||"",document.getElementById("post-slug").value=t.slug||"",t.created_at&&(o=new Date(t.created_at),document.getElementById("post-date").value=o.toISOString().split("T")[0]),document.getElementById("post-categories").value=t.categories?t.categories.join(", "):"",document.getElementById("post-tags").value=t.tags?t.tags.join(", "):"",document.getElementById("post-content").value=t.content||t.body||"",document.getElementById("post-excerpt").value=t.excerpt||""):((o=document.getElementById("post-edit-form"))&&o.reset(),document.getElementById("post-id").value=""),e.style.display="block"},window.closePostEditModal=function(){var t=document.getElementById("post-edit-modal");t&&(t.style.display="none")}})();