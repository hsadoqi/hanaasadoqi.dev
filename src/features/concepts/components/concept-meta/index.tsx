import { ConceptItem } from '../../types';
import { ConceptTags } from './concept-tags';
import { ReceiptList } from './receipt-list';

export default function ConceptMeta({ item }: { item: ConceptItem }) {
  return (
    <div className="space-y-4">
      <ConceptTags label="Seen in" items={item.projects} />
      <ConceptTags label="Could link to" items={item.writing} />
      <ReceiptList receipts={item.receipts} />
    </div>
  );
}

export { ConceptTags, ReceiptList, ConceptMeta };
