import { EntitySubscriberInterface, EventSubscriber, LoadEvent } from 'typeorm';
import { Content } from './content.entity';

@EventSubscriber()
export class ContentSubscriber implements EntitySubscriberInterface<Content> {
  listenTo() {
    return Content;
  }

  async afterLoad(entity: Content, event: LoadEvent<Content>): Promise<void> {
    const { entity: e, manager } = event;
    await manager
      .getRepository(Content)
      .createQueryBuilder()
      .update()
      .set({ view: () => 'view + 1' })
      .where("content_id =  :id", {id: e.content_id})
      .execute()
  }
}
