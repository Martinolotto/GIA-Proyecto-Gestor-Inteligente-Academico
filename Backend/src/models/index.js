import { TableAdministrador } from "./Administrador.Model.js";
import { TableRepresentante } from "./Representante.Model.js";
import { TableInstitucion } from "./Institucion.Model.js";
import { TableUsarios } from "./Usuario.Model.js";

TableUsarios.hasOne(TableAdministrador, { foreignKey: 'usuario_id' });
TableAdministrador.belongsTo(TableUsarios, { foreignKey: 'usuario_id' });

TableUsarios.hasOne(TableRepresentante, { foreignKey: 'usuario_id' });
TableRepresentante.belongsTo(TableUsarios, { foreignKey: 'usuario_id' });

TableInstitucion.hasMany(TableRepresentante, { foreignKey: 'institucion_id' });
TableRepresentante.belongsTo(TableInstitucion, { foreignKey: 'institucion_id' });