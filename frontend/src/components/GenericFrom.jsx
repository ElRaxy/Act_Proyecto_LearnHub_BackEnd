import React from 'react'

const GenericFrom = ({ data, fields, onChange, onBack, onSave, isEditing }) => {
  const handleSubmit = e => {
    e.preventDefault()
    onSave()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map(field => {
          const { key, label, type } = field

          return (
            <div key={key}>
              <label>{label}</label>
              <br />

              {type === 'select' ? (
                <select
                  value={
                    data[key] && typeof data[key] === 'object'
                      ? data[key]._id || data[key].id
                      : data[key] || ''
                  }
                  onChange={e => onChange(key, e.target.value)}
                  disabled={!isEditing}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  {field.options &&
                    field.options.map((opt, index) => (
                      <option
                        key={opt[field.optionValue] || index}
                        value={opt[field.optionValue]}
                      >
                        {opt[field.optionLabel]}
                      </option>
                    ))}
                </select>
              ) : type === 'textarea' ? (
                <textarea
                  value={data[key] || ''}
                  onChange={e => onChange(key, e.target.value)}
                  required
                  readOnly={!isEditing}
                />
              ) : (
                <input
                  type={type || 'text'}
                  value={data[key] || ''}
                  onChange={e => onChange(key, e.target.value)}
                  required
                  readOnly={!isEditing}
                />
              )}
              <br />
              <br />
            </div>
          )
        })}

        {isEditing && <button type="submit">Guardar Cambios</button>}
      </form>

      <hr />
      <button type="button" onClick={onBack}>
        Volver
      </button>
    </div>
  )
}

export default GenericFrom