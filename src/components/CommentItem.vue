<template>
    <div class="mb-6 flex items-center justify-between">
                    <div class="flex items-center space-x-6">
                        <img src="https://i.pravatar.cc/300?img=70" alt="" class="w-[40px] rounded-full" />
                        <p><strong>
                            <RouterLink :to="{name:'profile',params:{'id':comment?.created_by?.id}}" > {{ comment?.created_by?.name }}</RouterLink>
                        </strong></p>
                    </div>
                    <p class="text-gray-600">{{ comment.created_at_formatted }}</p>
    </div>

                <!-- <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis odio, voluptatibus dolorem fugit tenetur, dolorum ad consequuntur, incidunt debitis perspiciatis ratione sequi quia illo commodi dignissimos minima voluptates quis. Perferendis.</p> -->
                <p>{{ comment.body }}</p>


</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';


export default {
    name: 'CommentItem',
    props: {
        comment: Object
    },
    // methods: {
    //     likePost(id) {
    //         axios.post(`api/post/like/${id}`)
    //             .then(response => {
    //             if (response.data === 'like created') {
    //                 this.post.like_count += 1;
    //             }
    //         })
    //             .catch(error => {
    //             console.log('error...//', error);
    //         });
    //     }
    // },
    components: { RouterLink }
}
</script>