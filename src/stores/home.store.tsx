import { Post, getPosts } from '../apis/posts.api';

import { action, observable } from 'mobx';

export default class HomeStore {

  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @observable loading: boolean = false;

  @action getPosts = async () => {
    this.loading = true
    try {
      const posts = await getPosts();
      this.posts = posts;
    } catch (error) {
      this.posts = [];
      throw error;
    } finally {
      this.loading = false
    }
  }

  @action addPost = (uriPhoto) => {
    const post: Post = {
      author: {
        avatar: 'https://i1.wp.com/www.jornadageek.com.br/wp-content/uploads/2016/10/Batman-not2.jpg?resize=696%2C398&ssl=1',
        id: 2,
        name: 'batman'
      },
      authorId: 2,
      description: 'minha foto',
      id: this.posts.length + 1,
      image: uriPhoto
    };

    this.posts.unshift(post);
  }

  @action toogleStatus = (status: boolean) => {
    this.photoReady = status;
  }

}

const homeStore = new HomeStore();
export { homeStore };
