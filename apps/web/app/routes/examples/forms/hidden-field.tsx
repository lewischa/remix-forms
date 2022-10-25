import hljs from 'highlight.js/lib/common'
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { formAction } from 'remix-forms'
import { z } from 'zod'
import Form from '~/ui/form'
import { metaTags } from '~/helpers'
import { makeDomainFunction } from 'domain-functions'
import Example from '~/ui/example'

const title = 'Hidden field'
const description = 'In this example, we add a hidden field to our form.'

export const meta: MetaFunction = () => metaTags({ title, description })

const code = `const schema = z.object({
  csrfToken: z.string().nonempty(),
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
  howYouFoundOutAboutUs: z.enum(['fromAFriend', 'google']),
})

export default () => (
    <Form
      schema={schema}
      hiddenFields={['csrfToken']}
      values={{ csrfToken: 'abc123' }}
    />
)`

const schema = z.object({
  csrfToken: z.string().nonempty(),
  firstName: z.string().nonempty(),
  email: z.string().nonempty().email(),
  howYouFoundOutAboutUs: z.enum(['fromAFriend', 'google']),
})

export const loader: LoaderFunction = () => ({
  code: hljs.highlight(code, { language: 'ts' }).value,
})

const mutation = makeDomainFunction(schema)(async (values) => values)

export const action: ActionFunction = async ({ request }) =>
  formAction({ request, schema, mutation })

export default function Component() {
  return (
    <Example title={title} description={description}>
      <Form
        schema={schema}
        hiddenFields={['csrfToken']}
        values={{ csrfToken: 'abc123' }}
      />
    </Example>
  )
}