import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Like } from "./entities/like.entity";
import { Citation } from "../citations/entities/citation.entity";


@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likes: Repository<Like>,

    @InjectRepository(Citation)
    private readonly citations: Repository<Citation>,
  ) {}

  async toggle(
    userId: string,
    citationId: string,
  ) {
    // Citation mavjudligini tekshirish
    const citation = await this.citations.findOne({
      where: {
        id: citationId,
      },
    });

    if (!citation) {
      throw new NotFoundException(
        "Citation not found",
      );
    }

    // Like mavjudligini tekshirish
    const like = await this.likes.findOne({
      where: {
        user_id: userId,
        citation_id: citationId,
      },
    });

    // Bor bo'lsa — unlike
    if (like) {
      await this.likes.delete({
        id: like.id,
      });
    }

    // Yo'q bo'lsa — like
    else {
      const newLike = this.likes.create({
        user_id: userId,
        citation_id: citationId,
      });

      await this.likes.save(newLike);
    }

    return {
      message: "OK",
    };
  }
}