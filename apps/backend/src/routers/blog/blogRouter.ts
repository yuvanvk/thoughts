import * as z from "zod";
import prisma from "@workspace/db/prisma";

import { publicProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const blogRouter = router({
  createDraft: publicProcedure
  .mutation(async (opts) => {
    try {
      
      if(!opts.ctx.session?.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please login to proceed"
        });
      }

      const blog = await prisma.blog.create({
        data: {
          title: "",
          description: "",   
          userId: opts.ctx.session.session.userId
        },
      })

      return { message: "Draft created", status: 200, id: blog.id }

    } catch (error) {
      console.log(error);
      
        if(error instanceof TRPCError) {
          throw error
        }

        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong"
        })
    }
  }),
  publish: publicProcedure
    .input(
      z.object({
        title: z.string().min(5).max(100),
        description: z.string(),
        image: z.string().nullable().optional(),
        id: z.string()
      })
    )
    .mutation(async (opts) => {
      try {
        const title = opts.input.title;
        const description = opts.input.description;
        const image = opts.input.image;
        const id = opts.input.id;

        if (!opts.ctx.session?.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please login to proceed.",
          });
        }

        await prisma.blog.update({
          where: { id },
          data: {
            title,
            description,
            imageUrl: image,
            status: "PUBLISHED",
            updatedAt: new Date(),
          },
        });

        return { message: "Blog created Successfully", status: 200 };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong. Please try again later.",
        });
      }
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async (opts) => {
      try {
        if (!opts.ctx.session?.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please login to proceed.",
          });
        }

        const blog = await prisma.blog.findUnique({
          where: {
            id: opts.input.id,
          },
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            imageUrl: true,
            user: {
              select: {
                name: true,
                image: true
              }
            }
          }
        });

        if (!blog) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Blog does not exist.",
          });
        }

        return { message: "OK", status: 200, blog };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong",
        });
      }
    }),
  getUserBlogs: publicProcedure.query(async (opts) => {
    try {
      if (!opts.ctx.session?.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please login to proceed",
        });
      }

      const blogs = await prisma.blog.findMany({
        where: {
          userId: opts.ctx.session.user.id,
          status: "PUBLISHED"
        },
      });

      return { message: "OK", status: 200, blogs };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Something went wrong",
      });
    }
  }),
  filter: publicProcedure
    .input(
      z.object({
        tag: z.string(),
      })
    )
    .query(async (opts) => {
      try {
        if (!opts.ctx.session?.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please login to proceed",
          });
        }
        const { tag } = opts.input;

        const blogs = await prisma.blog.findMany({
          where: {
            tags: {
              some: {
                name: tag,
              },
            },
          },
        });

        return { message: "OK", status: 200, blogs };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong",
        });
      }
    }),
    getBlogs: publicProcedure
    .query(async (opts) => {
      try {
        if(!opts.ctx.session?.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please login to proceed"
          })
        }
        const blogs = await prisma.blog.findMany({
          where: { status: "PUBLISHED" },
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            imageUrl: true,
            tags: true,
            status: true,
            user: {
              select: {
                name: true,
                image: true
              }
            }
          }
        })

        return { message: "OK", status:200, blogs }
      } catch (error) {
        if(error instanceof TRPCError) {
          throw error
        }

        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong"
        })
      }
    }),
    getDrafts: publicProcedure
    .query(async (opts) => {
      try {
        if(!opts.ctx.session?.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please login to proceed"
          })
        }

        const drafts = await prisma.blog.findMany({
          where: { status: "DRAFT" },
        })

        return { message: "OK", status: 200, drafts }
        
      } catch (error) {
        if(error instanceof TRPCError) {
          throw error
        }

        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong"
        })
      }
    }),
    deleteDraft: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(async (opts) => {
      try {
        if(!opts.ctx.session?.session) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Please login to proceed"
          })
        }
  
        const { id } = opts.input;
        
        await prisma.blog.delete({
          where: {
            id,
            status: "DRAFT"
          }
        });
  
        return { messsage: "Deleted draft successfully", status: 200 }
      } catch (error) {
        if(error instanceof TRPCError) {
          throw error
        }

        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: "Something went wrong"
        })
      }
    })
});
