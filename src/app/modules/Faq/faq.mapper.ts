
import { FAQ } from "../../../generated/prisma/client";

export const FAQMapper = {

    toResponse(faq: FAQ | null) {

        if (!faq) return null;

        return {
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            sortOrder: faq.sortOrder,
            isPublished: faq.isPublished,
            category: faq.category,
            createdAt: faq.createdAt,
            updatedAt: faq.updatedAt,
        };
    },

    toCommonResponse(faq: FAQ | null) {

        if (!faq) return null;

        return {
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
        };
    },

    toList(faqs: FAQ[]) {
        return faqs.map((faq) => this.toResponse(faq));
    },

    toCreateResponse(faq: FAQ) {
        return this.toCommonResponse(faq);
    },

    toUpdateResponse(faq: FAQ) {
        return this.toCommonResponse(faq);
    },

    toDeleteResponse(faq: FAQ) {
        return this.toCommonResponse(faq);
    },

    toPublishStatusResponse(faq: FAQ) {
        return this.toCommonResponse(faq);
    },
};
