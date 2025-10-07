import { execQuery } from "../config/db.js"
import querys from "../querys/querys.js"

/**
 * Verifica si el usuario tiene permiso sobre la categoría.
 * @param {number} id_user - ID del usuario actual.
 * @param {number} id_category - ID de la categoría a consultar.
 * @param {Object} options - Opciones adicionales.
 * @param {boolean} options.requireOwnership - Si se requiere que el usuario sea el dueño.
 * @returns {Promise<{status: number, data?: any, message?: string}>}
 */
export const validateCategoryAccess = async (id_user, id_category, options = { requireOwnership: false }) => {
    try {
        const [category] = await execQuery(querys.categories.getByID, [id_category]);

        if (!category) {
            return { status: 404, message: "Categoría no encontrada" };
        }

        const isOwner = category.id_user === id_user;
        const isPublic = category.ispublic;

        if (options.requireOwnership && !isOwner) {
            return { status: 401, message: "No tienes permiso para modificar esta categoría" };
        }

        if (!options.requireOwnership && !isOwner && !isPublic) {
            return { status: 401, message: "No tienes permiso para ver esta categoría" };
        }

        return { status: 200, data: category };

    } catch (error) {
        console.error("Error en validación de permisos:", error);
        return { status: 500, message: "Error interno del servidor" };
    }
}

/**
 * Verifica si el usuario es dueño del proyecto.
 */
export const validateProjectOwnership = async (id_user, id_project) => {
    try {
        const [project] = await execQuery(querys.projects.getById, [id_project, id_user, id_project]);

        if (!project) {
            return { status: 404, message: "Proyecto no encontrado o sin acceso" };
        }

        if (project.id_user !== id_user) {
            return { status: 401, message: "Permiso denegado" };
        }

        return { status: 200, data: project };

    } catch (error) {
        console.error("Error validando proyecto:", error);
        return { status: 500, message: "Error interno del servidor" };
    }
};
