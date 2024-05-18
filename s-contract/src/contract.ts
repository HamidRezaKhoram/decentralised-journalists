// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from 'near-sdk-js';

type Article = {
  author: string;
  title: string;
  createdAt: string; // Date and time in ISO 8601 format
  content: string;
};

@NearBindgen({})
class ArticleContract {
  articles: Article[] = [];

  @view({}) // This method is read-only and can be called for free
  get_articles(): Article[] {
    return this.articles;
  }

  @call({}) // This method changes the state, for which it costs gas
  add_article({ author, title, createdAt, content }: Article): void {
    const newArticle: Article = { author, title, createdAt, content };
    near.log(`Adding article: ${title} by ${author}`);
    this.articles.unshift(newArticle);
  }
}

@NearBindgen({})
class HelloNear {
  greeting: string = 'Hello';

  @view({}) // This method is read-only and can be called for free
  get_greeting(): string {
    return this.greeting;
  }

  @call({}) // This method changes the state, for which it cost gas
  set_greeting({ greeting }: { greeting: string }): void {
    near.log(`Saving greeting ${greeting}`);
    this.greeting = greeting;
  }
}