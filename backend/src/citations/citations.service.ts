import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Citation } from "./entities/citation.entity";


@Injectable()
export class CitationsService {
  constructor(
    @InjectRepository(Citation)
    private citations: Repository<Citation>,
  ) {}

  async create(data: any) {
    const citation = this.citations.create({
      body: data.body,
      book_id: data.book_id,
    });

    await this.citations.save(citation);

    return { message: "Added new citation" };
  }

  async update(id: string, data: any) {
    const citation = await this.citations.findOne({
      where: { id },
    });

    if (!citation) {
      throw new NotFoundException("Citation not found");
    }

    citation.body = data.body;
    citation.book_id = data.book_id;

    await this.citations.save(citation);

    return { message: "Updated citation" };
  }

  async delete(id: string) {
    const citation = await this.citations.findOne({
      where: { id },
    });

    if (!citation) {
      throw new NotFoundException("Citation not found");
    }

    await this.citations.remove(citation);

    return { message: "Deleted citation" };
  }
}