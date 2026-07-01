import { ConceptItem } from '../../types';
import { ConceptMetaTags } from './concept-tags';
import { ConceptReceiptList } from './receipt-list';

export function ConceptMeta({ item }: { item: ConceptItem }) {
  return (
    <div className="space-y-4">
      <ConceptMetaTags label="Seen in" items={item.projects} />
      <ConceptMetaTags label="Could link to" items={item.writing} />
      <ConceptReceiptList receipts={item.receipts} />
    </div>
  );
}

export { ConceptMetaTags, ConceptReceiptList };
